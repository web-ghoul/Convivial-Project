import Forms from "forms/Forms"
import { PrimaryBox } from "mui/PrimaryBox"
import { PrimaryContainer } from "mui/PrimaryContainer"
import { SpecialBox } from "mui/SpecialBox"

const Login = () => {
  return (
    <SpecialBox>
      <PrimaryBox>
        <PrimaryContainer>
          <Forms type={"login"} />
        </PrimaryContainer>
      </PrimaryBox>
    </SpecialBox>
  )
}

export default Login