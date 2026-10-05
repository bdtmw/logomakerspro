/** Renders one or more schema.org objects as JSON-LD. */
export default function JsonLd({ data }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return list.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped so no tag can break out of the script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ));
}
