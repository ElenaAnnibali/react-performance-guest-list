/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import Header from './components/Header';
import Layout from './components/Layout';

const buttonStyles = css`
  padding: 10px 20px;
  margin-top: 60px;
  margin-left: 50px;
  height: 60px;
  font-family: 'LackRegular', sans-serif;
  text-transform: uppercase;
  background: rgba(139, 80, 80, 0.61);
  border: 3px solid #000000;
  border-radius: 10px;
  color: #fffbeb;
  font-weight: bold;
  font-size: 18px;
  box-shadow: #422800 4px 4px 0 0;

  :hover {
    background-color: rgba(185, 96, 80, 0.61);
  }

  :active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  @media (min-width: 768px) {
    min-width: 120px;
    padding: 0 25px;
  }
`;

const titleContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const titleStyles = css`
  text-transform: uppercase;
  text-align: center;
  font-size: 100px;
  margin-top: 110px;
  margin-bottom: 40px;
`;

const aTitleStyles = css`
  text-transform: uppercase;
  text-align: center;
  font-size: 120px;
  margin-top: 80px;
  margin-bottom: 40px;
`;

const titleLineStyles = css`
  width: 146px;
  height: 5px;
  border: 5px solid #000;
  margin-top: 130px;
`;

const backgroundstyles = css`
  position: absolute;
  width: 1680px;
  height: 1117px;
  left: 0px;
  top: 0px;
  mix-blend-mode: overlay;
`;

const descriptionStyles = css`
  margin-left: 330px;
  margin-right: 150px;
  margin-top: 20px;
  font-weight: bold;
`;

const secondSectionStyles = css`
  display: flex;
`;

const centralSectionStyles = css`
  display: flex;
  flex-direction: column;
  margin-left: 400px;

  span,
  p {
    margin-left: -100px;
  }
`;

const formStyles = css`
  margin-top: 50px;
  position: relative;

  label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
  }
`;

const inputStyles = css`
  margin-left: 20px;
  padding: 5px;
  margin-top: 10px;
  border: 3px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 211px;
  height: 52px;
`;

const secondInputStyles = css`
  margin-left: 24px;
  padding: 5px;
  margin-top: 30px;
  border: 3px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 211px;
  height: 52px;
`;

const spanStyles = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 90px;
  gap: 40px;

  .uppercase {
    text-transform: uppercase;
  }
`;

const paragraphStyles = css`
  margin-top: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const infosStyles = css`
  width: 284px;
  height: 90px;
  margin-left: -60px;
  margin-top: 200px;

  font-family: 'InaiMathi';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;

  color: #000000;

  transform: rotate(-90deg);

  p {
    margin: 0;
  }
`;

const socialStyles = css`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  gap: 20px;
  margin-left: 500px;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    margin-top: 100px;
    text-transform: uppercase;
    font-weight: bold;
    transform: rotate(-90deg);
    margin-left: -15px;
    font-size: 18px;
  }

  .twitter {
    width: 30px;
    height: 25px;
  }

  .wiggle {
    transform: rotate(-90deg);
    width: 70px;
    height: 8px;
    margin-top: 80px;
    margin-left: -15px;
  }
`;

const linkStyles = css`
  text-decoration: none;
  color: #190b11;
  position: relative;
`;

function App() {
  // const baseUrl = 'http://localhost:4000';
  const baseUrl = 'https://upleveled-guest-list-api.herokuapp.com';

  // hooks for inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // hooks for API
  const [guests, setGuests] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);

  // useRef identifier
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);

  // get guests with useEffect
  useEffect(() => {
    console.log('fetching guests');

    async function getGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      setLoading(false);
      const totalGuests = await response.json();
      setGuests(totalGuests);
      console.log('all guests successfully fetched!');
    }
    getGuests().catch(() => {
      console.log('fetch failed, retrying in 10 sec. Please wait');
      setTimeout(() => setRefetch(!refetch), 10000);
    });
  }, [refetch]);

  // create guest function
  async function createGuest(newGuest) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newGuest[0].trim(),
        lastName: newGuest[1].trim(),
      }),
    });
    const createdGuest = await response.json();
    const newGuests = [...guests, createdGuest];
    console.log('added guests:', newGuests);
    setGuests(newGuests);

    inputFirstName.current.value = '';
    setFirstName('');
    inputLastName.current.value = '';
    setLastName('');

    console.log('Loading is...:', loading);
  }

  return (
    <div>
      <Layout />
      <img css={backgroundstyles} src="/bg.png" alt="background" />
      <div css={titleContainerStyle}>
        <p className="selector" css={aTitleStyles}>
          A
        </p>
        <div css={titleLineStyles} />
        <h1 className="selector" css={titleStyles}>
          taraxia
        </h1>
      </div>
      <p css={descriptionStyles}>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?"
      </p>

      {/* second section: flex needed  */}
      <div css={secondSectionStyles}>
        <div css={infosStyles}>
          <p>NEXT: GALERIE PRENTLHOF, VIENNA (AT), 10.08 - 15.09</p>
        </div>
        <div css={centralSectionStyles}>
          <div css={spanStyles}>
            <span>Opening party on 10.08 at Galerie Prentlhof</span>
            <span className="uppercase">
              Come and join us for a unique experience
            </span>
          </div>
          <div css={formStyles}>
            <label>
              First name
              <input
                css={inputStyles}
                disabled={loading ? true : false}
                ref={inputFirstName}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
                required
              />
            </label>
            <br />
            <label>
              Last name
              <input
                css={secondInputStyles}
                disabled={loading ? true : false}
                ref={inputLastName}
                onChange={(event) => {
                  setLastName(event.currentTarget.value);
                }}
                required
                // onKeyDown={(event) => {
                //   if (event.key === 'Enter' && firstName !== '' && lastName !== '') {
                //     createGuest([firstName, lastName]).catch(
                //       'sorry, something went wrong while crearting the guest. Please try again.',
                //     );
                //   }
                // }}
              />
            </label>
            <br />
            <button
              css={buttonStyles}
              onClick={() => {
                if (!firstName || !lastName) {
                  alert('first name and last name required');
                }
                createGuest([firstName, lastName]).catch(() => {
                  console.log('error');
                });
              }}
            >
              Add me to the list
            </button>
          </div>
          <p css={paragraphStyles}>
            Curious about who else is coming? Take a look at the{' '}
            <Link css={linkStyles} to="/guestList">
              Guest List
            </Link>
          </p>
        </div>
        <div css={socialStyles}>
          <img src="/facebook.png" alt="facebook logo" />
          <img src="/instagramlogo.svg" alt="instagram logo" />
          <img className="twitter" src="/twitter.png" alt="twitter logo" />
          <img className="wiggle" src="/wiggle.svg" alt="wavy line" />
          <span>social</span>
        </div>
      </div>
    </div>
  );
}

export default App;
