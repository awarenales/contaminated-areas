export type Sample = {
  id: string
  parameter: string
  value: number | string
  date: string
}

export type SampleResponse = Sample & { pointId: string; pointLabel: string }

export type Point = {
  id: string
  name: string
  x: number | string
  y: number | string
  samples: Sample[] | []
}
