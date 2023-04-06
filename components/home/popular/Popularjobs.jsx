import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { COLORS, SIZES } from '../../../constants'
import useFetch from '../../../hooks/useFetch'

const PopularJobs = () => {
	const { data, error, loading, refetch } = useFetch(
		'search',
		{
			query: 'React Developer',
			num_pages: 1
		}
	)
	const [selectedJob, setSelectedJob] = useState()

	// console.log(data)

  return (
    <View style={styles.container}>
		<View style={styles.header}>
			<Text style={styles.headerTitle}>Popular Jobs</Text>
			<TouchableOpacity>
				<Text style={styles.headerBtn}>Show all</Text>
			</TouchableOpacity>
		</View>

		<View style={styles.cardsContainer}>
			{ loading
				? (
					<ActivityIndicator color={COLORS.primary} size='large' />
				) : error ? (
					<Text>{error.message}</Text>
				) : (
					<FlatList 
						data={data}
						renderItem={({item}) => (
							<PopularJobCard 
								item={item}
								handleCardPress={() => {}}
								selectedJob={selectedJob}
							/>
						)}
						contentContainerStyle={{ columnGap: SIZES.large }}
						horizontal
						keyExtractor={item => item.job_id}
					/>
				)
			}
		</View>
    </View>
  )
}

export default PopularJobs