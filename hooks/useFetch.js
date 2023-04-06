import { useEffect, useState } from "react"
import axios from "axios"
import { RAPID_API_KEY } from "@env"

const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([])
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		params: { ...query },
		headers: {
		  'X-RapidAPI-Key': rapidApiKey,
		  'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
		}
	}

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await axios.request(options)
			setData(response.data.data)
		}
		catch(err) {
			setError(err)
			alert('Error occurred while fetching data', err)
		}
		finally {
			setLoading(false)
		}
	}

	const refetch = () => {
		setLoading(true)
		fetchData()
	}

	useEffect(() => {
		console.log(rapidApiKey)
		fetchData()
	}, [])

	return {
		loading, error, data, refetch
	}
}

export default useFetch