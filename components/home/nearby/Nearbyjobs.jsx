import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles from './nearbyjobs.style'
import useFetch from '../../../hooks/useFetch'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { useRouter } from 'expo-router'

const NearbyJobs = () => {
	const { loading, data, error } = useFetch('search', {
		query: 'React Native Developer',
		num_pages: 1
	})
	// console.log(data)
	const router = useRouter()

	return (
    <View style={styles.container}>
		<View
			style={styles.header}
		>
      		<Text style={styles.headerTitle}>Nearby jobs</Text>
			<TouchableOpacity>
				<Text style={styles.headerBtn}>Show all</Text>	
			</TouchableOpacity>	
		</View>

		<View style={styles.cardsContainer}>
			{ loading
				? <ActivityIndicator color={COLORS.primary} size='large' />
				: error
					? <Text>Something went wrong</Text>
					: (
						data?.map(job => (
							<NearbyJobCard 
								job={job}
								key={`nearby-job-${job.job_id}`}
								handleNavigate={() => router.push(`/job-detail/${job.job_id}`)}
							/>
						))
					)
			}
		</View>	
    </View>
  )
}

export default NearbyJobs