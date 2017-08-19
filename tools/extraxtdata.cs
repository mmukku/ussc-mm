void Main()
{

	string documentText = File.ReadAllText(@"k:\downloads\APPENDIX_C_Vol_I.txt");
	
	var lines = documentText.Split('\n');
	documentText = string.Join("\n", lines.Where((line => !(line.StartsWith("November 1, 2003 APPENDIX C - VOLUME I Amendment") || line.EndsWith("APPENDIX C - VOLUME I November 1, 2003"))  )));
	
	documentText = Regex.Replace(documentText, @"– \d –", "");
	
	
	Regex regex2 = new Regex(@"\n\d+\. Amendment:", RegexOptions.Compiled);
	var amendmentTexts = regex2.Split(documentText).Skip(1);
	int number = 1;
	List<Amendment> amendments = new List<Amendment>();
	
	foreach (var text in amendmentTexts)
	{
		amendments.Add(Extract(text, number++));
	}
	
	JsonConvert.SerializeObject(amendments).Dump();
}
const string REASON = "REASON FOR AMENDMENT:";
const string EFFECTIVEDATE = "Effective Date:";


public Amendment Extract(string text, int number)
{

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