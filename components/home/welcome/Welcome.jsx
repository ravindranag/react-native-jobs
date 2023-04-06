import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'

import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'
import { useRouter } from 'expo-router'

const jobTypes = ['Full-time', 'Part-time', 'Contractor']

const Welcome = () => {
	const [activeJobType, setActiveJobType] = useState('Full-time')
	const router = useRouter()

  return (
    <View 
		style={{
			rowGap: SIZES.small
		}}
	>
      <View style={styles.container}>
		<Text
			style={styles.userName}
		>
			Hello Ravindra
		</Text>
		<Text
			style={styles.welcomeMessage}
		>
			Find your perfect job
		</Text>
	  </View>

	  <View style={styles.searchContainer}>
		<View style={styles.searchWrapper}>
			<TextInput 
				style={styles.searchInput}
				value=""
				placeholder='What are you looking for?'
				onChange={() => {}}
			/>
		</View>

		<TouchableOpacity
			style={styles.searchBtn}
			onPress={() => {}}
		>
			<Image 
				style={styles.searchBtnImage}
				resizeMode='contain'
				source={icons.search}
			/>
		</TouchableOpacity>
	  </View>

	  <FlatList 
	  	data={jobTypes}
		renderItem={({ item }) => (
			<TouchableOpacity 
				style={styles.tab(activeJobType, item)}
				onPress={() => {
					setActiveJobType(item)
					router.push(`/search/${item}`)
				}}
			>
				<Text style={styles.tabText(activeJobType, item)}>{item}</Text>
			</TouchableOpacity>
		)}	
		keyExtractor={item => item}
		horizontal
		contentContainerStyle={{ columnGap: SIZES.small }}
	  />
    </View>
  )
}

export default Welcome