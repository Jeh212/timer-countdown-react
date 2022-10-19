import { createContext, ReactNode, useReducer, useState } from 'react'
import { cyclesReducer } from '../reducers/cycles/reducers'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import {
  CreateCycleData,
  Cycle,
  CyclesContextType,
} from './ContextProtocols/ICyclesContext'

export const CycleContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const createNewCycle = ({ minutesAmount, task }: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    // setCycle((state) => [...state, newCycle])

    setAmountSecondsPassed(0)
  }

  const interruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
