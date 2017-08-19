void Main()
{
	Regex regex = new Regex(@"\n\d+\. Amendment:", RegexOptions.Compiled);
//	var inFile = @"K:\Projects\ussc\src\data\APPENDIX_C_Vol_I.txt";
//	int number = 1;

//	var inFile = @"K:\Projects\ussc\src\data\APPENDIX_C_Vol_II.txt";
//	int number = 577;
	
//	var inFile = @"K:\Projects\ussc\src\data\APPENDIX_C_Vol_III.txt";
//	var number = 663;

	var inFile = @"K:\Projects\ussc\src\data\APPENDIX_C_Supplement.txt";
	var number = 761;
	regex = regex = new Regex(@"AMENDMENT \d+\r\nAMENDMENT:", RegexOptions.Compiled);
	
	string documentText = File.ReadAllText(inFile);

	var lines = documentText.Split('\n');
	documentText = string.Join("\n", lines.Where((line =>
		!(
			   line.StartsWith("November 1, 2003 APPENDIX C - VOLUME I Amendment")
			|| line.StartsWith("November 1, 2011 APPENDIX C - VOLUME II Amendment")
			|| line.StartsWith("November 1, 2003 APPENDIX C - VOLUME III Amendment")
			|| line.EndsWith("VOLUME I November 1, 2003")
			|| line.StartsWith("APPENDIX C - VOLUME III November 1, 2011")
			|| line.EndsWith("VOLUME III November 1, 2011")
			|| line.EndsWith("VOLUME II November 1, 2003")
			|| line.StartsWith("Supplement to Appendix C")
			|| line.StartsWith("AMENDMENTS TO THE GUIDELINES MANUAL")
			|| line.EndsWith("Supplement to Appendix C (November 1, 2016)")
			|| line.StartsWith("SUPPLEMENT TO APPENDIX C")


		)  )));
		
	
	documentText = Regex.Replace(documentText, @"– \d+ –", "");
//documentText.Dump();
	var amendmentTexts = regex.Split(documentText).Skip(1);
	
	//amendmentTexts.First().Dump();
	
	
	
	List<Amendment> amendments = new List<Amendment>();
	
	foreach (var text in amendmentTexts)
	{
		amendments.Add(Extract(text, number++));
	}
	
	File.WriteAllText(inFile.Replace(".txt", ".html"), Util.ToHtmlString(amendments));
	File.WriteAllText(inFile.Replace(".txt", ".json"), JsonConvert.SerializeObject(amendments));
}
const string REASON = "REASON FOR AMENDMENT:";
const string EFFECTIVEDATE = "Effective Date:";


public Amendment Extract(string text, int number)
{

	text = text.Replace($"Amendment {number} APPENDIX C - VOLUME I November 1, 2003\r\n", "");
	text = text.Replace($"Amendment {number} APPENDIX C - VOLUME II November 1, 2011\r\n", "");
	text = text.Replace($"Amendment {number} APPENDIX C - VOLUME III November 1, 2011\r\n", "");
	text = text.Replace($"November 1, 2003 APPENDIX C - VOLUME I Amendment {number}\r\n", "");
	text = text.Replace($"November 1, 2011 APPENDIX C - VOLUME III Amendment {number}\r\n", "");
	text = text.Replace($"November 1, 2003 APPENDIX C - VOLUME II Amendment {number}\r\n", "");
	//Console.WriteLine(text);
	var a = new Amendment() { Id = number };
	///Console.WriteLine(text);

	int reasonIndex = text.IndexOf(REASON, StringComparison.CurrentCultureIgnoreCase);

	int effectiveDateIndex = text.IndexOf(EFFECTIVEDATE);
	a.Text = text.Substring(0, reasonIndex).Trim();
	a.Reason = text.Substring(reasonIndex, effectiveDateIndex - reasonIndex).Trim();
	a.EffectiveDate = text.Split('\n').FirstOrDefault(l => l.StartsWith(EFFECTIVEDATE)).Trim();
	//a.Dump();
	return a;
}

public class Amendment
{
	public int Id { get; set; }
	public string Title => $"Amendment {Id}";
	public string Text { get; set; }
	public string Reason { get; set; }
	public string EffectiveDate { get; set; }
}