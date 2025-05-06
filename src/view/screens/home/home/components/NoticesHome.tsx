import { View, Text } from 'react-native'
import React from 'react'
import { Notes } from '../../../../../lib/interfaces/Notes'

interface NoticesHomeProps {
  notes: Notes[]
}

const NoticesHome = ({notes}: NoticesHomeProps) => {

    // console.log('Notas:', notes)
    return (
        <View>
        <Text>NoticesHome</Text>
        </View>
    )
}

export default NoticesHome