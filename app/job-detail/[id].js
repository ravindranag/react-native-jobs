import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native"
import { COLORS, SIZES, icons } from "../../constants"
import { Stack, useSearchParams } from "expo-router"
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"

import Company from '../../components/jobdetails/company/Company'
import Tabs from "../../components/jobdetails/tabs/Tabs"
import Specifics from "../../components/jobdetails/specifics/Specifics"
import About from "../../components/jobdetails/about/About"
import Footer from "../../components/jobdetails/footer/Footer"

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetail = () => {
	const params = useSearchParams()
	const [refreshing, setRefreshing] = useState(false)
	const [activeTab, setActiveTab] = useState(tabs[0])

	const { loading, data, error } = useFetch('job-details', {
		job_id: params.id
	})

	const onRefresh = () => {}

	const displayTabContent = () => {
		switch(activeTab) {
			case 'About':
				return (
					<About 
						info={data[0].job_description}
					/>
				)
			case 'Qualifications':
				return (
					<Specifics 
						title='Qualifications'
						points={data[0].job_highlights?.Qualifications ?? ['N/A']}
					/>
				)
			case 'Responsibilities':
				return (
					<Specifics 
						title='Responsibilities'
						points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
					/>
				)
			default:
				 break;
		}
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.lightWhite
			}}
		>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.lightWhite
					},
					headerShadowVisible: false,
					headerRight: () => (
						<ScreenHeaderBtn 
							iconUrl={icons.share}
							dimension='60%'
						/>
					), 
					headerTitle: ''
				}}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl 
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{
					loading
						? <ActivityIndicator color={COLORS.primary} size='large' />
						: error
							? <Text>Something went wrong</Text>
							: data.length === 0
								? <Text>No Data</Text>
								: (
									<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
										<Company 
											companyLogo={data[0].employer_logo}
											companyName={data[0].employer_name}
											jobTitle={data[0].job_title}
											location={data[0].job_country}
										/>
										<Tabs 
											tabs={tabs}
											activeTab={activeTab}
											setActiveTab={setActiveTab}
										/>

										{ displayTabContent() }
									</View>
								)
				}
			</ScrollView>

			<Footer 
				url={data[0]?.job_google_link ?? 'https://careers.google.com/'}
			/>
		</SafeAreaView>
	)
}

export default JobDetail