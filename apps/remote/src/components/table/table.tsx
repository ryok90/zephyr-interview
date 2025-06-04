import styles from './table.module.css';

export type TableData = {
  name: string;
  dateOfBirth: string;
  email: string;
};

export interface TableProps {
  data: TableData[];
}

export function Table({ data }: TableProps) {
  return (
    <>
      <table className={`${styles.table} mt-6`}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Age</th>
            <th className={styles.tableHeader}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className={styles.tableRow} key={row.email}>
              <td className={styles.tableCell}>{row.name}</td>
              <td className={styles.tableCell}>{age(row.dateOfBirth)}</td>
              <td className={styles.tableCell}>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={`${styles.table} mt-6`}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>
              Letter counters in all the names - [letter:total]
            </th>
            <th className={styles.tableHeader}>Average Age</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow} key="totals">
            <td className={styles.tableCell}>{totalLetterNumbers(data)}</td>
            <td className={styles.tableCell}>{averageAge(data)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

const totalLetterNumbers = (data: TableData[]): string => {
  const letterMap: Record<string, number> = {};

  data.forEach((person) => {
    const letters = person.name.toUpperCase().split('');
    letters.forEach((letter) => {
      if (letter === ' ') return;
      letterMap[letter]++;
    });
  });

  return Object.entries(letterMap).reduce(
    (prev, [letter, total]) => `${prev} [${letter}:${total}]`,
    ''
  );
};

const averageAge = (data: TableData[]): number => {
  const totalAge = data.reduce((prev, person) => {
    return prev + age(person.dateOfBirth);
  }, '');

  return +totalAge / data.length;
};

const age = (dateOfBirth: string): number => {
  const currentTime = new Date().getTime();
  const birthTime = new Date(dateOfBirth).getTime();
  const timeDifference = currentTime - birthTime;

  // Convert milliseconds to years by creating a date from the difference
  // and getting the year component (subtracting 1970 as the epoch year)
  const ageInYears = new Date(timeDifference).getUTCFullYear() - 1970;

  return ageInYears;
};

export default Table;
