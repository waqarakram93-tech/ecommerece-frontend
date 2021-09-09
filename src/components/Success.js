import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';

const Success = () => {
    const history = useHistory()
    useEffect(() => {
        const timeout = setTimeout(() => history.push('/orders'), 3000)
        return () => clearTimeout(timeout)
    }, [history])

    return <Alert variant='success'>Payment is being processed! Thank you for your purchase</Alert>
}

export default Success