import { PURPLE, YELLOW } from "../utils";

const Record = ({ data }: Record<string, any>) => (
  <div style={{
    margin: ".2em",
    padding: "1em",
    backgroundColor: PURPLE,
    color: YELLOW,
  }}
  >
    <div style={{ marginBottom: ".75em", borderBottom: `1px solid ${YELLOW}` }}>
      <h3 style={{ marginBottom: ".25em" }}>{data.name}</h3>
      {data.address && <p style={{ marginTop: 0 }}>{data.address}</p>}
    </div>
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "1em 0" }}>
      {data.tags?.length > 0 && (
        data.tags.map((tag: string) => (
          <div
            id="chip"
            key={tag}
            style={{
              backgroundColor: YELLOW,
              color: PURPLE,
              padding: "5px 25px",
              borderRadius: "25px",
              marginRight: ".75em",
              fontWeight: 700,
            }}
          >
            {tag.toUpperCase()}
          </div>
        ))
      )}
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
            <dd><a href={`tel:${data.phone}`} style={{ color: YELLOW }}>{data.phone}</a></dd>
          </>
        )}
        {data.website && data.bitly && (
          <>
            <dt>Website</dt>
            <dd><a href={data.bitly} target="_blank" rel="noopener noreferrer" style={{ color: YELLOW }}>{data.website}</a></dd>
          </>
        )}
        <dt>Reports</dt>
        <dd>Coming soon!</dd>
      </dl>
    </div>
  </div>
);

export default Record;
