import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import outboundImage from './assets/carlow-timetable-outbound.jpg';
import returnImage from './assets/carlow-timetable-return.jpg';

// Stop names, IDs and times transcribed from Martley's timetable updated 9 September 2026.
const outbound = `
Mountmellick|Square|131562|7:10|11:25|—
Portlaoise|Fairgreen, Glencrean Crescent|160211|7:15|11:30|15:10
Portlaoise|Rossvale|160281|7:22|11:37|15:17
Portlaoise|Liogard|160291|7:22|11:37|15:17
Portlaoise|Lakeglen|160301|7:23|11:38|15:18
Portlaoise|Old Dunnes Stores|160311|7:23|11:38|15:18
Portlaoise|Market Square, Old Post Office|12468|7:25|11:40|15:20
Portlaoise|Bellingham|160591|7:27|11:42|15:22
Portlaoise|Maryborough Village|160601|7:28|11:43|15:23
Portlaoise|Dromadoon|160611|7:29|11:44|15:24
Portlaoise|Kellyville Park|160341|7:30|11:45|15:25
Portlaoise|JFL Avenue|155411|7:30|11:45|15:25
Portlaoise|Stradbally Road, St Peter & Pauls Church|12466|7:33|11:48|15:28
Portlaoise|Stradbrook|160671|7:33|11:48|15:28
Portlaoise|St Fintans Hospital Campus|160681|7:33|11:48|15:28
Portlaoise|Summerhill|160691|7:34|11:49|15:29
Portlaoise|Block Road|160701|7:35|11:50|15:30
Portlaoise|Laois Education Centre|160711|7:35|11:50|15:30
Portlaoise|Portlaoise Hospital, Apple Green|155451|7:36|11:51|15:31
Portlaoise|Carrick Hill|160721|7:37|11:52|15:32
Portlaoise|Kilminchy|11241|7:40|11:55|15:35
Stradbally|Main Street, Court Square|330831|7:50|12:05|15:55
Stradbally|Dunnes Pub||7:51|12:06|15:56
Arles|Bus Stop|11282|8:05|12:20|16:10
Ballickmoyler|Bus Stop|12477|8:10|12:25|16:15
Carlow|Coach Park|11721|8:20|12:35|16:25
Carlow|SETU, Carlow|136061|8:25|12:40|16:30
Carlow|Carlow Institute of Further Education|12324|8:27|12:42|16:32
`.trim().split('\n').map((line) => line.split('|'));

const inbound = `
Carlow|Carlow Institute of Further Education|12325|8:55|12:55|17:05
Carlow|SETU, Carlow|598121|8:57|12:57|17:07
Carlow|Coach Park|11721|9:02|13:02|17:12
Ballickmoyler|Bus Stop|12476|9:12|13:12|17:22
Arles|Church|12672|9:17|13:17|17:27
Stradbally|Square||9:31|13:31|17:41
Stradbally|Woodlands Estate|13031|9:32|13:32|17:42
Portlaoise|Kilminchy|160731|9:52|13:52|18:02
Portlaoise|Carrick Hill|160441|9:55|13:55|18:05
Portlaoise|Portlaoise Hospital, opposite Applegreen|155311|9:56|13:56|18:06
Portlaoise|Laois Education Centre, Block Road|11225|9:57|13:57|18:07
Portlaoise|Summerville|160471|9:58|13:58|18:08
Portlaoise|St Fintans Hospital Campus|160481|9:59|13:59|18:09
Portlaoise|Stradbrook|160491|9:59|13:59|18:09
Portlaoise|Stradbally Road, St Peter and Pauls Church|12467|9:59|13:59|18:09
Portlaoise|JFL Avenue|155321|10:02|14:02|18:12
Portlaoise|Kellyville, Kellyville Park|160121|10:03|14:03|18:13
Portlaoise|Bellingham|160591|10:05|14:05|18:15
Portlaoise|Maryborough Village|160601|10:06|14:06|18:16
Portlaoise|Dromadoon|160611|10:07|14:07|18:17
Portlaoise|Coote Street, Market Square|160131|10:09|14:09|18:19
Portlaoise|Maryborough, Old Dunnes Stores|160151|10:11|14:11|18:21
Portlaoise|Lakeglen|160161|10:11|14:11|18:21
Portlaoise|Liogard|160171|10:12|14:12|18:22
Portlaoise|Rossvale, Rossleighan Park|160181|10:12|14:12|18:22
Portlaoise|Glenkeen Crescent, Glenkeen Upper|160191|10:15|14:15|18:25
Mountmellick|Square|131561|10:20|14:20|18:30
`.trim().split('\n').map((line) => line.split('|'));

export default function CarlowTimetable() {
  const [direction, setDirection] = useState('outbound');
  const [query, setQuery] = useState('');
  const rows = direction === 'outbound' ? outbound : inbound;
  const visibleRows = rows.filter(([place, stop]) => (place + ' ' + stop).toLowerCase().includes(query.trim().toLowerCase()));
  const image = direction === 'outbound' ? outboundImage : returnImage;
  const label = direction === 'outbound' ? 'Mountmellick to Carlow' : 'Carlow to Mountmellick';

  return (
    <div className="carlow-schedule">
      <div className="carlow-schedule__top">
        <div role="group" aria-label="Timetable direction" className="carlow-schedule__directions">
          <button type="button" aria-pressed={direction === 'outbound'} onClick={() => setDirection('outbound')}>To Carlow</button>
          <button type="button" aria-pressed={direction === 'inbound'} onClick={() => setDirection('inbound')}>From Carlow</button>
        </div>
        <a href={image} download>Download timetable image <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" /></a>
      </div>
      <label className="carlow-schedule__search">Find your stop
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Kilminchy or SETU" />
      </label>
      <div className="carlow-schedule__table">
        <table>
          <caption>{label} · Monday to Friday · updated 9 September 2026</caption>
          <thead><tr><th scope="col">Stop</th><th scope="col">Morning</th><th scope="col">Midday</th><th scope="col">Afternoon</th></tr></thead>
          <tbody>{visibleRows.map(([place, stop, id, morning, midday, afternoon]) => (
            <tr key={place + stop}>
              <th scope="row"><strong>{stop}</strong><small>{place}{id && <> · Stop {id}</>}</small></th>
              <td>{morning}</td><td>{midday}</td><td>{afternoon}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {visibleRows.length === 0 && <p className="carlow-schedule__empty">No stops match that search. Try a town or another stop name.</p>}
      <p className="carlow-schedule__note">Times are shown in 24-hour format. An em dash means this trip does not serve that stop.</p>
    </div>
  );
}
