'use client'

import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { API_URL, PARAMETERS, Point, Sample, pointLabel } from '@/app/utils'

type SampleForm = Omit<Sample, 'id'> & { pointId: string | number }

export default function RegisterParameters() {
  const initialForm = { pointId: '', parameter: '', value: '', date: '' }
  const [form, setForm] = useState<SampleForm>(initialForm)
  const [status, setStatus] = useState<'typing' | 'success' | 'error'>('typing')
  const [unit, setUnit] = useState('mg/l')
  const [pointsSelect, setPointsSelect] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/points`)
      .then((res) => res.json())
      .then((data) => {
        const pointsToSelectOptions = data.map((point: Point) => ({
          value: point.id,
          label: pointLabel(point),
        }))
        setPointsSelect(pointsToSelectOptions)
      })
  }, [])

  function handleChangePoint(e: ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, pointId: Number(e.target.value) })
  }
  function handleChangeParameter(e: ChangeEvent<HTMLSelectElement>) {
    const parameter = e.target.value
    setForm({ ...form, parameter })
    switch (parameter) {
      case 'escherichia':
        setUnit('NMP/100ml')
        break
      case 'dbo':
        setUnit('mg O2/l')
        break
      default:
        setUnit('mg/l')
        break
    }
  }
  function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, value: Number(e.target.value) })
  }
  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, date: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    fetch(`${API_URL}/samples`, {
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
          <Select placeholder="Selecione o ponto" onChange={handleChangePoint}>
            {pointsSelect.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            placeholder="Selecione o parâmetro"
            onChange={handleChangeParameter}
          >
            {PARAMETERS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel m={1}>Valor</FormLabel>
          <Input
            placeholder={unit}
            value={form.value}
            onChange={handleChangeValue}
            type="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel m={1}>Data de coleta</FormLabel>
          <Input value={form.date} onChange={handleChangeDate} type="date" />
        </FormControl>
        <Button colorScheme="orange" type="submit" onClick={handleSubmit}>
          Criar
        </Button>
        {status === 'success' && <p>Criado com sucesso!</p>}
        {status === 'error' && <p>Erro! Parâmetro não foi criado</p>}
      </Flex>
    </Container>
  )
}
