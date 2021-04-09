import React, { Component } from 'react';
import { Text, Box, GridItem } from "@chakra-ui/react"
import creator from "../ethereum/matchCreator"
import ShowTeams from "./MatchDetails/showTeams"
import Statistics from "./MatchDetails/statistics"

class MatchDetails extends Component{
  constructor(props) {
    super(props)
    this.state = {
      matchSelected: null,
      manager: null,
      matchs: [],
      loading: true,
      matchSelected: null,     
    }
  }
  
  async componentDidMount() {
    await this.loadBlockchainData(this.props.dispatch)
  } 
 
  async loadBlockchainData(dispatch) {
    const manager = await creator.methods.manager().call();
    let number = await creator.methods.contracts().call();    
    let matchs = []
    let list;
    var i
    for(i = 0; i < number; i++ ) {
     list = await creator.methods.matchsDetails(i).call()
     matchs.push({
       address: list.matchAddress,
       team1: list.team1,
       team2: list.team2,
       minimum: list.minimum,
       date: list.date
     }) 
    }   

    this.setState({manager, matchs, loading: false}) 
  }     

  render(){
    if(this.props.match == null){
      return (
        <GridItem colSpan={5}>
        <Box width="full" height="full" borderWidth="1px" borderRadius="lg" p="2" margin="2">
          <Text> No hay match </Text>
        </Box>   
      </GridItem>
      )
    } else {   
    return( 
      <GridItem colSpan={5}>
        <Box width="full" height="full" borderWidth="1px" borderRadius="lg" p="2" margin="2">          
          <ShowTeams match = {this.props.match} />
          <Statistics match = {this.props.match} />
        </Box>   
      </GridItem>
    )
    }  
  }
}

export default MatchDetails
