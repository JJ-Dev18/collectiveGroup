import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

type Props = {
  email : string;
  city : string
  country: string ;
  quantity: number;
  price : number;
  subtotal : number;
  transactionId : string;
  name : string,
  createdAt : string;
  id : string,
  paymentResult : string;
}  
export const EmailTemplate = ( 
   { email 
    , city, 
    country 
    , quantity
    ,price
    , subtotal
    , transactionId
    , name
     ,createdAt
     ,id,
     paymentResult }:Props) => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date and more</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={track.container}>
          <Row>
            <Column>
              <Text style={global.paragraphWithBold}>Tracking Number</Text>
              <Text style={track.number}>{transactionId}</Text>
            </Column>
            <Column align="right">
              <Link style={global.button}>Track Package</Link>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
        <Row>
           <Heading style={global.heading}>Were on it.</Heading>
          <Text style={adressTitle}>Hey {name} ,</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>This is just a quick email to say weve recieved your order</Text>
          <Text style={track.number}>Once everything is confirmed and ready to ship, Well send you a another email with the tracking details and any other information about your package</Text>
          
        </Row>
        </Section>
       <Section >
          <Img 
            src={`/logo.svg`}
            width="100"
            height="100"
            alt="Collective intelligence"
            style={{ margin: 'auto' }}
          />
          <Heading style={global.heading}>Its On Its Way.</Heading>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Shipping to:  {name}</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>
            {/* 2125 Chestnut St, San Francisco, CA 94123 */}
            {country} - {city}
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section
          style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
        >
          <Row>
            <Column>
              <Img
                src={`${baseUrl}/static/nike-product.png`}
                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                style={{ float: 'left' }}
                width="260px"
              />
            </Column>
            <Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
              <Text style={{ ...paragraph, fontWeight: '500' }}>
                317E Main St, Pickens, SC, 29671, USA
              </Text>
              <Text style={global.text}>Quantity : {quantity}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
            <Column style={{ width: '170px' }}>
              <Text style={global.paragraphWithBold}>Order Number</Text>
              <Text style={track.number}>{id}</Text>
            </Column>
            <Column style={{ width: '170px' }}>
              <Text style={global.paragraphWithBold}>Order Date</Text>
              <Text style={track.number}>{createdAt}</Text>
            </Column>
            <Column >
            <Text style={global.paragraphWithBold}>Order Status</Text>
              <Text style={track.number}>{paymentResult}</Text>
            </Column>
          </Row>
        
        </Section>
        <Hr style={global.hr} />
         <Section>
         <Text style={menu.title}>Get Help</Text>
         <Row style={menu.tel}>
            <Column>
              <Row>
                <Column style={{ width: '16px' }}>
                  <Img
                    src={`${baseUrl}/static/nike-phone.png`}
                    width="16px"
                    height="26px"
                    style={{ paddingRight: '14px' }}
                  />
                </Column>
                <Column>
                  <Text style={{ ...menu.text, marginBottom: '0' }}>
                    1-800-806-6453
                  </Text>
                </Column>
              </Row>
            </Column>
            <Column>
              <Text
                style={{
                  ...menu.text,
                  marginBottom: '0',
                }}
              >
                4 am - 11 pm PT
              </Text>
            </Column>
          </Row>
         </Section>
       
        <Hr style={{ ...global.hr, marginTop: '12px' }} />
        <Section style={paddingY}>
          <Row style={footer.policy}>
            <Column>
              <Text style={footer.text}>Web Version</Text>
            </Column>
            <Column>
              <Text style={footer.text}>Privacy Policy</Text>
            </Column>
          </Row>
          <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
            Please contact us if you have any questions. (If you reply to this
            email, we wont be able to see it.)
          </Text>
          <Text style={footer.text}>
            © 2023 Collective Intelligence Group
          </Text>
          {/* <Text style={footer.text}>
            NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.
          </Text> */}
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
};

const paragraph = {
  margin: '0',
  lineHeight: '2',
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000',
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '10px auto',
  width: '600px',
  border: '1px solid #E5E5E5',
};

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7',
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
  },
};

const message = {
  padding: '20px 44px',
  textAlign: 'center',
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold',
};

const recomendationsText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '1',
  paddingLeft: '10px',
  paddingRight: '10px',
};

const recomendations = {
  container: {
    padding: '20px 0',
  },
  product: {
    verticalAlign: 'top',
    textAlign: 'left' as const,
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
  text: {
    ...recomendationsText,
    paddingTop: '4px',
    color: '#747474',
  },
};

const menu = {
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    backgroundColor: '#F7F7F7',
  },
  content: {
    ...paddingY,
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '13.5px',
    marginTop: 0,
    fontWeight: 500,
    color: '#000',
  },
  tel: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '32px',
    paddingBottom: '22px',
  },
};

const categories = {
  container: {
    width: '370px',
    margin: 'auto',
    paddingTop: '12px',
  },
  text: {
    fontWeight: '500',
    color: '#000',
  },
};

const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
};
