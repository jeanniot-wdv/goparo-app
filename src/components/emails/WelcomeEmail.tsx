// emails/WelcomeEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  nom: string;
  nomGarage: string;
  tailleGarage: string;
  forfait: string;
}

export default function WelcomeEmail({
  nom,
  nomGarage,
  tailleGarage,
  forfait,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading as="h1" style={heading}>
              Goparo
            </Heading>
            <Text style={text}>Merci de votre intérêt !</Text>
          </Section>

          {/* Contenu */}
          <Section style={h2}>
            <Heading as="h2" style={h2}>
              Bonjour {nom} 👋
            </Heading>

            <Text style={paragraph}>
              Nous sommes ravis de vous compter parmi les premiers intéressés par
              l'application <strong>Goparo</strong>, la solution SaaS complète pour
              la gestion de votre garage automobile.
            </Text>

            <Text style={paragraph}>
              <strong>Vos informations :</strong>
            </Text>
            <Text style={listItem}>• Garage : {nomGarage}</Text>
            <Text style={listItem}>• Taille : {tailleGarage} employés</Text>
            <Text style={listItem}>• Forfait : {forfait}</Text>

            <Text style={paragraph}>
              <strong>Prochaines étapes :</strong>
            </Text>
            <Text style={listItem}>1. Nous finalisons les dernières fonctionnalités</Text>
            <Text style={listItem}>2. Vous recevrez un accès anticipé dès le lancement</Text>
            <Text style={listItem}>3. Une démo personnalisée vous sera proposée</Text>

            <Section style={offer}>
              <Text style={offerText}>
                <strong>🎁 Offre spéciale lancement :</strong>
                <br />
                En tant que membre de la liste d'attente, vous bénéficierez de{' '}
                <strong>3 mois gratuits</strong> à l'ouverture du service !
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              MonGarage - La gestion de garage simplifiée
              <br />
              © {new Date().getFullYear()} Tous droits réservés
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles inline (obligatoire pour les emails)
const main = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f6f6f6',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
};

const header = {
  textAlign: 'center' as const,
  paddingBottom: '20px',
  borderBottom: '1px solid #eee',
};

const heading = {
  fontSize: '24px',
  margin: '0',
  color: '#333',
};

const h2 = {
  fontSize: '20px',
  margin: '20px 0 10px',
  color: '#333',
};

const text = {
  fontSize: '16px',
  color: '#666',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#333',
  marginBottom: '15px',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#333',
  marginBottom: '5px',
};

const offer = {
  marginTop: '25px',
  paddingTop: '15px',
  borderTop: '1px solid #eee',
};

const offerText = {
  fontSize: '16px',
  color: '#333',
  margin: '0',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '30px',
  paddingTop: '20px',
  borderTop: '1px solid #eee',
  fontSize: '12px',
  color: '#999',
};

const footerText = {
  margin: '0',
  color: '#999',
};
