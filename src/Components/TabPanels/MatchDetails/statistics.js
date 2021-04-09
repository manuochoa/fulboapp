import React, {Component} from "react";
import app1 from "../../ethereum/app1";
import {Bnb} from "../../icons/Bnb"
import { SimpleGrid, Stat, StatLabel, StatGroup, StatNumber, VStack, Divider, Text } from "@chakra-ui/react";
import web3 from "../../ethereum/web3";

class Statistics extends Component{
  constructor(props) {
    super(props)
    this.state = {
      counterBetsTeam1: null,
      counterBetsTeam2: null,
      counterBetsEqual:null,
      gamblerteam1:null,
      gamblerteam2:null,
      gamblerEqual:null,
      winner:null,
      poolPrize:null,
      profitsToTake:null,
      betsOpen:null,
      team1:"",
      team2:"",      
    }
  }
  
  async componentDidMount() {
    await this.loadBlockchainData(this.props.dispatch)     
  } 

  async loadBlockchainData(props) {
    let address = this.props.match.address;
    const match = await app1(address);    
    const summary = await match.methods.getStats().call();
    const team1 = await match.methods.nameTeam1().call();
    const team2 = await match.methods.nameTeam2().call();    
    
    this.setState({
      counterBetsTeam1: summary[0],
      counterBetsTeam2: summary[1] ,
      counterBetsEqual: summary[2],
      gamblerteam1: summary[3],
      gamblerteam2: summary[4],
      gamblerEqual: summary[5],
      winner: summary[6],
      poolPrize: summary[7],
      profitsToTake: summary[8],
      betsOpen: summary[9],
      team1,
      team2,      
    })
  }
  
  async componentDidUpdate() {
    let address = this.props.match.address;  
    const match = await app1(address);
    const summary = await match.methods.getStats().call(); 
    this.setState({
      counterBetsTeam1: summary[0],
      counterBetsTeam2: summary[1] ,
      counterBetsEqual: summary[2],
      gamblerteam1: summary[3],
      gamblerteam2: summary[4],
      gamblerEqual: summary[5],
      winner: summary[6],
      poolPrize: summary[7],
      profitsToTake: summary[8],      
    })       
  }

  render(props){       
    return (
      <VStack>
        <StatGroup fontSize="l" padding= "3">  
          <Divider orientation="horizontal" />                        
            <Text textAlign="center">Estadisticas</Text>            
          <Divider mb="5" orientation="horizontal" />

          {this.state.winner == "0" ? ("") :  
          <SimpleGrid columns={2} spacing={4} w="100%">
              <Stat textAlign="center" >
                  <StatLabel>Total en premios</StatLabel>
                  <StatNumber>{this.state.poolPrize/10**18} <Bnb /> 
                  </StatNumber>
              </Stat>
              <Stat textAlign="center">
                  <StatLabel >Premios por cobrar</StatLabel>
                  <StatNumber>{(this.state.profitsToTake/10**18).toFixed(2)} <Bnb />
                  </StatNumber>
              </Stat>
              <Divider mb="5" orientation="horizontal" />
          </SimpleGrid>}
          
          <SimpleGrid columns={3} spacing={4} w="100%">
            <VStack>
              <Stat >
                <StatLabel >Apuestas por {this.state.team1} </StatLabel>
                <StatNumber textAlign="center">{this.state.counterBetsTeam1/10**18} <Bnb />
                </StatNumber>
              </Stat>    
              <Stat>
                <StatLabel>Hinchaz de {this.state.team1}</StatLabel>
                <StatNumber textAlign="center">{this.state.gamblerteam1}</StatNumber>
              </Stat>
            </VStack>
            <VStack>
              <Stat>
                <StatLabel>Apuestas por empate</StatLabel>
                <StatNumber textAlign="center">{this.state.counterBetsEqual/10**18} <Bnb />
                </StatNumber>
              </Stat>  
              <Stat>
                <StatLabel>Apostadores</StatLabel>
                <StatNumber textAlign="center">{this.state.gamblerEqual}</StatNumber>
              </Stat>
            </VStack>
            <VStack>
              <Stat>
                <StatLabel>Apuestas por {this.state.team2}</StatLabel>
                <StatNumber textAlign="center">{this.state.counterBetsTeam2/10**18} <Bnb />
                </StatNumber>
              </Stat>    
              <Stat>
                <StatLabel>Hinchaz de {this.state.team2}</StatLabel>
                <StatNumber textAlign="center">{this.state.gamblerteam2}</StatNumber>
              </Stat>
            </VStack>
          </SimpleGrid>
        </StatGroup>            
      </VStack>
    )
  }  
}

export default Statistics