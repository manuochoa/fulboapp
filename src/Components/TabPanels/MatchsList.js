import React, { Component } from 'react';
import { Text, Grid, Box, Divider, GridItem, Spinner, Button } from "@chakra-ui/react"
import creator from "../ethereum/matchCreator"
import MatchDetails from './MatchDetails';

class MatchsList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      manager: null,
      matchs: [],
      loading: true,
      matchSelected: null,
      size: 1,   
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
    var i = (number - 1)
    for(; i >= 0 ; i-- ) {
     list = await creator.methods.matchsDetails(i).call()
     matchs.push({
       address: list.matchAddress,
       team1: list.team1,
       team2: list.team2,
       minimum: list.minimum,
       date: list.date
     }) 
    }   

    this.setState({manager, matchs, loading: false }) 
  } 

  async componentDidUpdate() {
    let number = await creator.methods.contracts().call();    
    let matchs = []
    let list;
    var i = (number - 1)
    for(; i >= 0 ; i-- ) {
     list = await creator.methods.matchsDetails(i).call()
     matchs.push({
       address: list.matchAddress,
       team1: list.team1,
       team2: list.team2,
       minimum: list.minimum,
       date: list.date,       
     }) 
    }   
  }

  render(){       
    
    if(this.state.loading === true ) { 
      return ( 
        <Grid
          p="3"
          h="xl"          
          templateColumns="repeat(7, 1fr)"
          gap={4}
        >
          <GridItem colSpan={2}>
            <Box as="button" width="full" h="full" borderWidth="1px" borderRadius="lg" p="2" margin="2">
              <Spinner  
                speed="0.85s"
                emptyColor="gray.200"
                size="xl" 
              />
            </Box> 
          </GridItem>
          <MatchDetails /> 
        </Grid>
      ) 
    } else { 
      return(  
        <Grid
          p="3"
          h="xl"          
          templateColumns="repeat(7, 1fr)"
          gap={4}
        > 
          <GridItem colSpan={2} >
            {this.state.matchs.slice(0, this.state.size).map(({address, team1, team2, minimum, date})=> (
              <Box 
                as="button" width="full" outlineColor="#90CDF4" 
                borderWidth="1px" borderRadius="lg" p="2" margin="2" key={address}
                onClick = { () => this.setState( {matchSelected: {address} } ) } >
                <Text fontSize="3xl" textAlign="center" isTruncated>
                  {team1} - {team2}
                  <br></br>             
                </Text>
                <Divider orientation="horizontal" />                        
                <Text textAlign="center">{date}</Text>
                <Text textAlign="center">Apuesta minima: {(minimum)/10**18}</Text>
              </Box>                         
            ))}
            <Button onClick={ () => this.setState({size: this.state.size + 1}) } >Uno mas</Button>
          </GridItem> 
            <MatchDetails match={this.state.matchSelected} /> 
        </Grid>
      )}
  }  
}

export default MatchsList