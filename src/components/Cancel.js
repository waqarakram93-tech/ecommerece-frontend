import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';

const Cancel = () => {
    const history = useHistory()
    useEffect(() => {
        const timeout = setTimeout(() => history.push('/orders'), 3000)
        return () => clearTimeout(timeout)
    }, [history])

    return <Alert variant='danger'>Payment was cancelled. Keep looking around!</Alert>
}

export default Cancel