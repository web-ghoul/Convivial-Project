import Forms from "../forms/Forms"
import { SpecialBox } from "../mui/SpecialBox"
import LogsSection from "../sections/LogsSection/LogsSection"

const Home = () => {
  return (
    <SpecialBox className="grid jcs aic">
      <Forms type={"search"} />
      <LogsSection/>
    </SpecialBox>
  )
}

export default Home