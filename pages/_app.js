import { ContextProvider } from "../store"
import moment from "moment"
import "moment/locale/ru"

import "../styles/globals.scss"

moment.locale("ru")

function Application({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default Application
