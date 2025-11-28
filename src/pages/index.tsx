import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  return (
    <Layout title="Home" description="Voiden Documentation">
      <main style={{padding: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
        <h1>Welcome to Voiden Documentation</h1>
        <p>Your comprehensive documentation hub</p>
        <div style={{marginTop: '2rem'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started-section/intro">
            Get Started
          </Link>
        </div>
      </main>
    </Layout>
  );
}

