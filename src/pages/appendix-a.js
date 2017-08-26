import React, { Component } from 'react';
import Link from 'gatsby-link'
import data from '../data/appendix-a.json'
import Container from '../components/container';

const uniqueTitles = Array.from(new Set(data.map(t => t.Title)));

const titleOptionList = uniqueTitles.map((t) =>
    <option key={t}>{t}</option>
);

class AppendixA extends Component {
    constructor() {
        super()
        this.state = { title: '', 
                        statue: '', 
                        guidelines:[],
                        statueOptionList:null }
    }
   
    render() {
        let results = "";
        if(this.state.guidelines.length > 0) {
            results = (<section>
                        <h4>Results</h4>
                        <ul>{this.state.guidelines}</ul>
                        </section>);
        };
        return(<Container>
            <h2>Statutory Index</h2>
	    <p>This index specifies the offense guideline section(s) in Chapter Two (Offense Conduct) applicable to the statute of conviction. If more than one guideline section is referenced for the particular statute, use the guideline most appropriate for the offense conduct charged in the count of which the defendant was convicted. For the rules governing the determination of the offense guideline section(s) from Chapter Two, and for any exceptions to those rules, see §1B1.2 (Applicable Guidelines). </p>
        <section>
            <label htmlFor="title">Title</label>
            <select id="title" onChange={this.cascadeStatue.bind(this)}
                value={this.state.title}>
                <option>Select</option>
                {titleOptionList}
            </select>
            <label htmlFor="statue">Statue</label>
            <select id="statue" value={this.state.statue} 
                onChange={e => this.setState({statue: e.target.value})}>
                <option>Select</option>
                {this.state.statueOptionList}
            </select>
            <button onClick={this.search.bind(this)}>Go</button>
            </section>
            {results}
        </Container>);
    }

    cascadeStatue(e)  { 
        let title = e.target.value;
        let statueOptions = data.filter(d => d.Title == title)
                        .map(x => <option key={x.Statue}>{x.Statue}</option>);
        this.setState({title: title, statueOptionList: statueOptions}) ;
    }

    search() {
        
        let results =  data.find(d => d.Title == this.state.title &&
            d.Statue == this.state.statue);
        if(results == undefined) return;
       
        let guidelines = results.Guidelines.split(",")
            .map(gl => <li key={gl}><a href='#'>{gl}</a></li>
        );
        this.setState({guidelines: guidelines});
    }
}

export default AppendixA;