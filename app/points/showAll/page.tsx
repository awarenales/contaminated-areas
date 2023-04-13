'use client'

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  API_URL,
  Point,
  getLabel,
  getMax,
  pointLabel,
  prettyDate,
  prettyNumber,
} from '@/app/utils'

export default function ShowAllPoints() {
  const [data, setData] = useState<Point[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/points`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Carregando...</p>
  if (data.length === 0) return <p>Nenhum dado a exibir</p>
  return (
    <>
      {data.map((point) => (
        <Box key={point.id} mb={4}>
          <Text fontSize="xl" fontWeight={'bold'}>
            {pointLabel(point)}
          </Text>
          {point.samples.length > 0 ? (
            <TableContainer key={point.id}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Parâmetro</Th>
                    <Th>Data da coleta</Th>
                    <Th isNumeric>Valor na coleta</Th>
                    <Th isNumeric>Valor máximo</Th>
                    <Th isNumeric>Coleta/máximo</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {point.samples.map(({ id, parameter, value, date }) => {
                    const max = getMax(parameter) || Number.POSITIVE_INFINITY
                    const proportion = value / max
                    return (
                      <Tr key={id}>
                        <Td>{getLabel(parameter)}</Td>
                        <Td>{prettyDate(date)}</Td>
                        <Td isNumeric color={value > max ? 'red' : 'black'}>
                          {value}
                        </Td>
                        <Td isNumeric>{max}</Td>
                        <Td isNumeric color={value > max ? 'red' : 'black'}>
                          {prettyNumber(proportion)}
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text>Nenhuma amostra cadastrada</Text>
          )}
        </Box>
      ))}
    </>
  )
}
