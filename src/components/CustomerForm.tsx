import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Container, Paper } from '@mui/material'
import InputMask from 'react-input-mask'

const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

export default function CustomerForm() {
    const paperStyle = {
        padding: '50px 20px',
        width: 600,
        margin: '20px auto',
    }

    const [cpf, setCpf] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    function handleClick(e: any) {
        e.preventDefault()
        const customer = { name, email, cpf, tel }
        fetch('http://localhost:8080/customer/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(customer),
        })
            .then(() => console.log('Cliente cadastrado.'))
            .catch((error) => console.log(error.message))
        setCpf('')
        setTel('')
        setEmail('')
        setName('')
        console.log(customer)
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: 'black' }}>Cadastrar cliente</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Nome"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-basic"
                        label="CPF"
                        variant="outlined"
                        placeholder="000.000.000-00"
                        type="number"
                        value={cpf}
                        onChange={(e) =>
                            e.target.value.length <= 11
                                ? setCpf(e.target.value)
                                : null
                        }
                        required
                    />

                    <TextField
                        id="outlined-basic"
                        label="Email"
                        value={email}
                        variant="outlined"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputMask
                        required
                        mask="(99) 99999 9999"
                        value={tel}
                        disabled={false}
                        onChange={(e) => setTel(e.target.value)}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            type="tel"
                        />
                    </InputMask>
                    <Button variant="outlined" onClick={handleClick}>
                        CADASTRAR
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
