import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useTxns} from "~/contexts/txns";
import {
    faDatabase,
    faGasPump,
    faUserCheck
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Hist = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 1rem;
  color: ${({theme}) => theme.colors.textColor};
  overflow-y: scroll;
  max-height: 50vh;
  
  .grid {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    height: auto;
    grid-gap: 0.5rem;
  }
  
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  p.in-progress {
    opacity: 0.5;
  }
  
  .grid > ul {
    grid-column: span 3;
    height: auto;
    padding-left: 1rem;
    color: #aaa;
  }
`;

const History = () => {
  const { txns } = useTxns();
  const ref = useRef<HTMLDivElement>(null);

  const values = Array.from(txns.values());
  useEffect(() => {
    if(ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [txns]);

  return (
    <Hist ref={ref}>
        <div className="grid">
            {values.map((value) => {
                const cls = value.from ? "" : "in-progress";
                return <React.Fragment key={value.hash}>
                    <p className={cls}><FontAwesomeIcon icon={faDatabase} /><b> {value.hash}</b></p>
                    <p className={cls}>{value.from && <FontAwesomeIcon icon={faUserCheck} />} {value.from}</p>
                    <p className={cls}>{value.gasUsed && <FontAwesomeIcon icon={faGasPump} />} {value.gasUsed} G</p>
                    {value.events?.length ?
                        <ul>
                            {value.events.map((event, i) => {
                                return <li key={i.toString()}>
                                    {JSON.stringify(event["0"])}
                                </li>
                            })}
                        </ul> : false
                    }
                </React.Fragment>
            })}
        </div>
    </Hist>
  );
}

export default History;
