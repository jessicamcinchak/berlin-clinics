import { PRIMARY, SECONDARY } from "../styles";

const Record = ({ data }: Record<string, any>) => (
  <div style={{
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "1em",
    backgroundColor: SECONDARY,
    color: PRIMARY,
  }}
  >
    <div style={{ marginBottom: ".5em", borderBottom: `1px solid ${PRIMARY}` }}>
      <h3 style={{ marginBottom: ".25em" }}>{data.name}</h3>
      {data.address && <p style={{ marginTop: 0 }}>{data.address}</p>}
    </div>
    <div>
      <dl>
        {data.about && (
          <>
            <dt>About</dt>
            <dd>{data.about}</dd>
          </>
        )}
        {data.cost && (
          <>
            <dt>Cost</dt>
            <dd>{data.cost}</dd>
          </>
        )}
        {data.appointment && (
          <>
            <dt>How to get the appointment</dt>
            <dd>{data.appointment}</dd>
          </>
        )}
        {data.languages?.length > 0 && (
          <>
            <dt>Languages</dt>
            <dd>{data.languages.filter(Boolean).join(", ")}</dd>
          </>
        )}
        {data.phone && (
          <>
            <dt>Phone</dt>
            <dd><a href={`tel:${data.phone}`} style={{ color: PRIMARY }}>{data.phone}</a></dd>
          </>
        )}
        {data.website && data.bitly && (
          <>
            <dt>Website</dt>
            <dd><a href={data.bitly} target="_blank" rel="noopener noreferrer" style={{ color: PRIMARY }}>{data.website}</a></dd>
          </>
        )}
        {data.reports && (
          <>
            <dt>User reports</dt>
            <dd><a href={data.reports} target="_blank" rel="noopener noreferrer" style={{ color: PRIMARY }}>Read more 👉</a></dd>
          </>
        )}
      </dl>
    </div>
  </div>
);

export default Record;
