export const PARAMETERS = [
  { id: 'aluminum', label: 'Alumínio dissolvido', unit: 'mg/l', max: 0.1 },
  { id: 'arsenic', label: 'Arsênio total', unit: 'mg/l', max: 0.01 },
  { id: 'lead', label: 'Chumbo total', unit: 'mg/l', max: 0.01 },
  { id: 'copper', label: 'Cobre dissolvido', unit: 'mg/l', max: 0.009 },
  {
    id: 'escherichia',
    label: 'Escherichia coli',
    unit: 'NMP/100ml',
    max: 1000,
  },
  { id: 'chrome', label: 'Cromo total', unit: 'mg/l', max: 0.05 },
  { id: 'cadmium', label: 'Cádmio total', unit: 'mg/l', max: 0.001 },
  { id: 'dbo', label: 'DBO', unit: 'mg O2/l', max: 5 },
]

export function getLabel(id: string) {
  return PARAMETERS.find((param) => param.id === id)?.label || ''
}

export function getMax(id: string) {
  return PARAMETERS.find((param) => param.id === id)?.max
}
