import React, {Component} from "react";
import app1 from "../../ethereum/app1";
import { Text, VStack, Divider, Spinner } from "@chakra-ui/react";

class ShowTeams extends Component{
    constructor(props) {
        super(props)
        this.state = {
            team1: "",
            team2: "",
            minimum: null,
            date: "",       
        }
    }
      
    async componentDidMount() {        
        await this.loadBlockchainData(this.props.dispatch)     
    } 
  
    async loadBlockchainData(dispatch) {
        let address = this.props.match.address
        const match = await app1(address);        
        const team1 = await match.methods.nameTeam1().call();
        const team2 = await match.methods.nameTeam2().call();
        const summary = await match.methods.getStats().call();        
    
        this.setState({team1, team2, date: summary[10], minimum: summary[11]})          
    } 

    async componentDidUpdate() {
        let address = this.props.match.address
        const match = await app1(address);        
        const team1 = await match.methods.nameTeam1().call();
        const team2 = await match.methods.nameTeam2().call();
        const summary = await match.methods.getStats().call();
        
        this.setState({team1, team2, date: summary[10], minimum: summary[11]})
    }    
  
    render(){ 

        return (
            <VStack>                
                <Text fontSize="3xl" textAlign="center" isTruncated>
                    {this.state.team1} - {this.state.team2}                            
                </Text>
                <Divider orientation="horizontal" />                        
                  <Text textAlign="center">{this.state.date}</Text>
                  <Text textAlign="center">Apuesta minima: {(this.state.minimum)/10**18} BNB</Text>
                <Divider orientation="horizontal" />
            </VStack>
        )
    }  
}
  
export default ShowTeams