'use client';

import { useFormContext } from 'react-hook-form';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import PollDetailsCard from '../shared/PollDetailsCard';
import useStore from '@/utils/store';
import WarningSVG from '@/public/images/WarningSVG';

export default function Review() {
  const { getValues, formState } = useFormContext<CreateNewPoll>();
  const { setStepIndex } = useStore();

  const {
    question,
    description,
    type,
    anonymity,
    endDateTime,
    quorum,
    options,
    participants,
  } = getValues();

  const date = new Date(endDateTime).toLocaleDateString();

  // time with hours and minutes
  const time = new Date(endDateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateTime = `${date} at ${time}`;

  const steps = [
    { title: 'Poll Question', value: question, step: 0 },
    { title: 'Poll Description', value: description, step: 0 },
    { title: 'Poll Type', value: type, step: 1 },
    {
      title: 'Answer Options',
      value: options.flatMap(option => option.option).join(', '),
      step: 1,
    },
    { title: 'Anonymity', value: anonymity, step: 2 },
    { title: 'Reveal Conditions', value: `${quorum}%`, step: 2 },
    { title: 'Deadline', value: dateTime, step: 3 },
    { title: 'Participants', value: participants?.join(', '), step: 4 },
  ];

  // Filter out steps with empty values
  const filteredSteps = steps.filter(
    step =>
      step.value !== undefined &&
      step.value !== null &&
      step.value !== '' &&
      step.value !== '0%'
  );

  // End date is not in the past
  const endDateIsValid = endDateTime > new Date();

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="pl-8 flex gap-2 flex-col pb-2 h-[375px] scrollbar-left-padded-green-sage overflow-y-auto">
        {!endDateIsValid && (
          <div className="flex gap-2 items-center">
            <WarningSVG width="14px" height="14px" />{' '}
            <p className="special-accent mr-auto">
              Deadline must be in the future!
            </p>
          </div>
        )}
        {filteredSteps.map((step, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setStepIndex(step.step)}
            className="text-start"
          >
            <PollDetailsCard title={step.title}>{step.value}</PollDetailsCard>
          </button>
        ))}
      </div>
    </div>
  );
}
