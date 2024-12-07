import React, { useSyncExternalStore } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const List = () => {

    const {list} = useSelector((state)=>state.form)

    return (
        <View>
            <Text>List</Text>
            <Text>{list?.firstName}</Text>
        </View>
    )
}

export default List
