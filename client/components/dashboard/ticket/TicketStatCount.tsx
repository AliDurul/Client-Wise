'use client';
import CountUp from 'react-countup';

export default function TicketStatCount({ count }: { count: number }) {
    return (
        <CountUp start={0} end={count} duration={7} />
    )
}
