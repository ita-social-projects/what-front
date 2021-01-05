import React from 'react';

import styles from './schedule.scss';

const SliderWeeks = () => (
  <div className={styles['slider-weeks']}>
    <svg className={styles['arrow-left']} width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5968 11.9058C13.7211 11.8048 13.8228 11.6698 13.8931 11.5123C13.9633 11.3547 14 11.1795 14 11.0015C14 10.8235 13.9633 10.6482 13.8931 10.4907C13.8228 10.3332 13.7211 10.1981 13.5968 10.0972L1.4643 0.196445C1.32436 0.0818443 1.16046 0.0146389 0.990391 0.00213242C0.820325 -0.0103741 0.650604 0.0322952 0.499667 0.125505C0.34873 0.218716 0.22235 0.358902 0.134258 0.530832C0.046167 0.702763 -0.000267236 0.899862 1.15693e-06 1.10072L1.15693e-06 20.9023C0.000703357 21.1027 0.0477347 21.299 0.136037 21.4703C0.22434 21.6415 0.350572 21.7811 0.50116 21.8741C0.651748 21.9671 0.820993 22.01 0.990695 21.9981C1.1604 21.9861 1.32413 21.9199 1.4643 21.8065L13.5968 11.9058Z" fill="#FFB800" />
    </svg>

    <h3 className={styles['week-name']}>Week 1</h3>

    <svg className={styles['arrow-right']} width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5968 11.9058C13.7211 11.8048 13.8228 11.6698 13.8931 11.5123C13.9633 11.3547 14 11.1795 14 11.0015C14 10.8235 13.9633 10.6482 13.8931 10.4907C13.8228 10.3332 13.7211 10.1981 13.5968 10.0972L1.4643 0.196445C1.32436 0.0818443 1.16046 0.0146389 0.990391 0.00213242C0.820325 -0.0103741 0.650604 0.0322952 0.499667 0.125505C0.34873 0.218716 0.22235 0.358902 0.134258 0.530832C0.046167 0.702763 -0.000267236 0.899862 1.15693e-06 1.10072L1.15693e-06 20.9023C0.000703357 21.1027 0.0477347 21.299 0.136037 21.4703C0.22434 21.6415 0.350572 21.7811 0.50116 21.8741C0.651748 21.9671 0.820993 22.01 0.990695 21.9981C1.1604 21.9861 1.32413 21.9199 1.4643 21.8065L13.5968 11.9058Z" fill="#FFB800" />
    </svg>
  </div>
);

const ClenadarFilter = () => (
  <input className={styles.calendar} type="date" />
);

const CustomCalendar = () => (
  <div className={styles['custom-calendar']}>
    <ul className={styles.lessons}>
      <li />
      <li className={styles['day-name']}>monday<p>15.03</p></li>
      <li className={styles['day-name']}>tuesday<p>16.03</p></li>
      <li className={styles['day-name']}>wednesday<p>17.03</p></li>
      <li className={styles['day-name']}>thursday<p>18.03</p></li>
      <li className={styles['day-name']}>friday<p>19.03</p></li>
      <li className={styles['day-name']}>saturday<p>20.03</p></li>
      <li className={styles['day-name']}>sunday<p>21.03</p></li>
      <li className={styles.time}>8:30-10:00</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li />
      <li />
      <li />
      <li />
      <li className={styles.time}>11:30-13:00</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li className={styles.time}>13:20-14:50</li>
      <li />
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li>class1</li>
      <li className={styles.time}>15:10-16:00</li>
      <li>class1</li>
      <li />
      <li />
      <li>class1</li>
      <li>class1</li>
      <li />
      <li />
      <li className={styles.time}>16:30-18:00</li>
      <li />
      <li />
      <li />
      <li>class1</li>
      <li>class1</li>
      <li />
      <li>class1</li>
      <li className={styles.time}>16:30-18:00</li>
      <li>class1</li>
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </div>
);

export const StudentSchedule = () => (
  <div className={styles['conteiner-calendar']}>
    <SliderWeeks />
    <ClenadarFilter />
    <CustomCalendar />
  </div>
);
