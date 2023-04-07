import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'

import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'
import { useRouter } from 'expo-router'

const jobTypes = ['Full-time', 'Part-time', 'Contractor']

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
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
				value={searchTerm}
				placeholder='What are you looking for?'
				onChangeText={(text) => setSearchTerm(text)}
			/>
		</View>

		<TouchableOpacity
			style={styles.searchBtn}
			onPress={handleClick}
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