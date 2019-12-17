import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state={
    fetchSushis:[],
    currentIndex: 0,
    fourSushisDisplay:[],
    totalEaten: 0,
    money: 100,
    moneytoAdd: 0
  }

  //fetch data and set to state
  componentDidMount(){
    fetch(API)
    .then(res => res.json())
    .then(res =>{
      res = res.map(e => ({...e,eaten:false}))
      this.setState({fetchSushis: res,
        fourSushisDisplay:res.slice(0,4),
        currentIndex:4
      })
    })
  }

  eatSushi = (id) => {
    let index = this.state.fetchSushis.findIndex(e => e.id === id)
    let newSushis = this.state.fetchSushis.slice()
    if(newSushis[index].price <= this.state.money && !newSushis[index].eaten){
      newSushis[index].eaten = true
      this.setState({
        fetchSushis: newSushis,
        totalEaten: this.state.totalEaten + 1,
        money: this.state.money - newSushis[index].price
      })
    }
  }
  getNewSushi = () =>{
    let ind = this.state.currentIndex
    let newSushis = this.state.fetchSushis.slice(ind,(ind + 4))
    ind = ind + 4
    // condition to circule back sushis
    if(!newSushis.length){ 
      newSushis = this.state.fetchSushis.slice(0,4)
      ind = 4
    }
    this.setState({
      currentIndex:ind,
      fourSushisDisplay: newSushis
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const mtoAdd = this.state.moneytoAdd
    if(mtoAdd){
      this.setState({money: this.state.money + mtoAdd, moneytoAdd: 0})
    }
  }
  handleChange = e =>{
    let mtoAdd
    if(e.target.value){
     mtoAdd = parseInt(e.target.value,10)
    }
    if(!mtoAdd) mtoAdd = 0
      this.setState({moneytoAdd: mtoAdd})
  }


  render() {
    return (
      <div className="app">
                <form onSubmit={this.handleSubmit}>Add Money<br/><input name="moneytoAdd"type="text" onChange={this.handleChange} value={this.state.moneytoAdd}/><input type="submit"/></form>
        <SushiContainer eatSushi={this.eatSushi} sushis={this.state.fourSushisDisplay} nextFour={this.getNewSushi} />
        <Table money={this.state.money} total={this.state.totalEaten}/>
      </div>
    );
  }
}

export default App;