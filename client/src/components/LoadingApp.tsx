import { Bars } from 'react-loader-spinner'

export default function LoadingApp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Bars
        height={60}
        width={60}
        color="#a855f7"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  )
}
