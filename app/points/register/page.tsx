'use client'

import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'

import { API_URL } from '@/app/utils'

export default function RegisterPoints() {
  const initialForm = { name: '', x: '', y: '' }
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'typing' | 'success' | 'error'>('typing')

  function handleChangeName(e) {
    setForm({ ...form, name: e.target.value })
  }
  function handleChangeX(e) {
    setForm({ ...form, x: Number(e.target.value) })
  }
  function handleChangeY(e) {
    setForm({ ...form, y: Number(e.target.value) })
  }
  function handleSubmit(e) {
    e.preventDefault()
    fetch(`${API_URL}/points`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 409) setStatus('error')
        else {
          setForm(initialForm)
          setStatus('success')
        }
      })
      .catch(() => setStatus('error'))
  }

  return (
    <Container>
      <Flex direction="column" gap={3}>
        <FormControl>
          <FormLabel>Nome do Ponto</FormLabel>
          <Input value={form.name} onChange={handleChangeName} />
        </FormControl>
        <Flex gap={3}>
          <FormControl>
            <FormLabel>X</FormLabel>
            <Input value={form.x} onChange={handleChangeX} type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Y</FormLabel>
            <Input value={form.y} onChange={handleChangeY} type="number" />
          </FormControl>
        </Flex>
        <Button colorScheme="orange" type="submit" onClick={handleSubmit}>
          Criar
        </Button>
        {status === 'success' && <p>Criado com sucesso!</p>}
        {status === 'error' && <p>Erro! Ponto não foi criado</p>}
      </Flex>
    </Container>
  )
}
