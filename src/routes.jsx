import CreateSchedule from './components/CreateSchedule'
import EditSchedule from './components/EditSchedule'
import ScheduleList from './components/ScheduleList'

export const routes = [
  {
    path: '/',
    element: <ScheduleList />,
  },
  {
    path: 'create',
    element: <CreateSchedule />,
  },
  {
    path: '/edit/:id',
    element: <EditSchedule />,
  },
]
