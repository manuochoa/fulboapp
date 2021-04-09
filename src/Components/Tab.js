import React from 'react';
import { Grid, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import MatchDetails from "./TabPanels/MatchDetails"
import Matchslist from "./TabPanels/MatchsList"
import LandingPage from "./TabPanels/LandingPage"

function MatchsTab() {
  return (    
    <Tabs variant="soft-rounded" p="2" colorScheme="green" isFitted isLazy isManual>
      <TabList>
        <Tab>Inicio</Tab>
        <Tab isDisabled></Tab>
        <Tab>Partidos</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LandingPage />
        </TabPanel>
        <TabPanel />
        <TabPanel>
          <Matchslist />                      
        </TabPanel>
      </TabPanels>
    </Tabs>                
  );
}

export default MatchsTab;