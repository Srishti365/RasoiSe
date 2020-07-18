import React from 'react'
import { Box, Text, Button, Icon } from 'admin-bro'


const Dashboard = (props) => {
    return (
        <Box>
            <Text color="#E86448" fontSize="50px" fontWeight="bold" marginLeft="500px" marginBottom="30px" marginTop="150px" >
                RasoiSe
            </Text>
            <Text></Text>
            <Text color="#4893E8" fontSize="50px" fontWeight="bold" marginLeft="400px" >
                Admin Dashboard
            </Text>
            <Button variant="info" marginLeft="520px" marginTop="50px" rounded="true">
                <Icon icon="Settings" />
                View
                </Button>
        </Box>


    )
}

export default Dashboard