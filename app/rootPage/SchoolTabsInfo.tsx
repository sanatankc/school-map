import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketOverview from './TabsContent/MarketOverview'
import CompetitorAnalysis from './TabsContent/CompetitorAnalysis'

const SchoolTabsInfo = () => {
  return (
    <Tabs defaultValue="marketOverview">
      <TabsList className='w-full bg-slate-50 justify-between'>
        <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="marketOverview">Market Overview</TabsTrigger>
        <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="competitorAnalysis">Competitor Analysis</TabsTrigger>
        <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="academics">Academics</TabsTrigger>
        <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="facilities">Facilities</TabsTrigger>
        <TabsTrigger className='text-slate-600 data-[state=active]:text-[#7376B8]' value="coCurricular">Co-curricular</TabsTrigger>
      </TabsList>
      <TabsContent value="marketOverview">
        <MarketOverview />
      </TabsContent>
      <TabsContent value="competitorAnalysis">
        <CompetitorAnalysis />
      </TabsContent>
      <TabsContent value="academics">Academics</TabsContent>
      <TabsContent value="facilities">Facilities</TabsContent>
      <TabsContent value="coCurricular">Co-curricular</TabsContent>
    </Tabs>
  )
}

export default SchoolTabsInfo
