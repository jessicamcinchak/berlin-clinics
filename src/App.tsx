import Airtable from 'airtable';
import { useEffect, useState } from 'react';

import ClinicsMap from './components/Map';

function App() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: import.meta.env.VITE_AIRTABLE_PAT,
  });

  useEffect(() => {
    // Fetch data from Airtable
    const base = Airtable.base('appC6yPBtEwltJNG6');
    const fetchedRecords: any[] = [];

    base('Clinics & Doctors')
      .select({
        maxRecords: 100,
        view: "Public View"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            fetchedRecords.push(record.fields);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            setError(err);
          }

          // On success
          setData(fetchedRecords);
          setIsLoading(false);
        }
      );
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Something went wrong! Map is currently unavailable</p>
      </div>
    );
  }

  return (
    <div>
      <ClinicsMap data={data} />
    </div>
  );
}

export default App
