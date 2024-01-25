import { useState } from 'react';
import "./App.css";

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function withDatePrettifier(Component) {
  return (props) => {
    const date = Date.parse(props.date);
    const currentDate = Date.now();
    const leftMinutes = Math.floor((currentDate - date) / 1000 / 60);
    let prettyDate = `${Math.floor(leftMinutes / 60 / 24)} суток назад`
    if (leftMinutes < 60) {
      prettyDate = `${leftMinutes} минут назад`
    } else if (leftMinutes < 60 * 24) {
      prettyDate = `${Math.floor(leftMinutes / 60)} часов назад`
    }
    return <Component {...props} date={prettyDate} />
  }
}

const DateTimePretty = withDatePrettifier(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-01-25 20:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-01-22 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-01-25 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}