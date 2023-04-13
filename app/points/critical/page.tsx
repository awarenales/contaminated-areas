'use client'

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  API_URL,
  SampleResponse,
  getLabel,
  getMax,
  prettyDate,
  prettyNumber,
} from '@/app/utils'

export default function CriticalPoints() {
  const [data, setData] = useState<SampleResponse[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/samples/critical`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Carregando...</p>
  if (data.length === 0) return <p>Nenhum dado a exibir</p>
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ponto</Th>
            <Th>Parâmetro</Th>
            <Th>Data da coleta</Th>
            <Th isNumeric>Valor na coleta</Th>
            <Th isNumeric>Valor máximo</Th>
            <Th isNumeric>Coleta/máximo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, parameter, value, date, pointLabel }) => {
            const max = getMax(parameter) || Number.POSITIVE_INFINITY
            const proportion = Number(value) / max
            return (
              <Tr key={id}>
                <Td>{pointLabel}</Td>
                <Td>{getLabel(parameter)}</Td>
                <Td>{prettyDate(date)}</Td>
                <Td isNumeric>{value}</Td>
                <Td isNumeric>{max}</Td>
                <Td isNumeric>{prettyNumber(proportion)}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
