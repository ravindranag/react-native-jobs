import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
	<TouchableOpacity
		onPress={onHandleSearchType}
		style={styles.btn(name, activeTab)}
	>
		<Text style={styles.btnText(name, activeTab)}>{name}</Text>
	</TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
		<FlatList 
			data={tabs}
			renderItem={({ item }) => (
				<TabButton
					name={item}
					activeTab={activeTab}
					onHandleSearchType={() => setActiveTab(item)}
				/>
			)}
			horizontal
			contentContainerStyle={{
				columnGap: SIZES.large
			}}
			showsHorizontalScrollIndicator={false}
			keyExtractor={item => item}
		/>
    </View>
  )
}

export default Tabs