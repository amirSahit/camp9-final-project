import React from 'react';
import Questionbox from '../Question';
import RadioButton from '../Radiobutton';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';
import CheckboxButton from '../CheckboxButton';

type Props = {
  type: string;
  options: string[] | undefined;
};

function VotingTypeChoice({ type, options }: Props) {
  const { register, setValue, getValues } = useFormContext<VotePoll>();

  function handleSingleChoice(option: string) {
    const checkForSingleChoice = getValues('answer');
    if (checkForSingleChoice && !checkForSingleChoice.includes(option)) {
      setValue('answer', [option]);
    }
  }

  function handleMultipleChoice(option: string) {
    const checkForAbstain = getValues('answer');
    if (checkForAbstain && checkForAbstain.includes('abstain')) {
      const filtered = checkForAbstain.filter(item => item !== 'abstain');
      setValue('answer', [...filtered, option]);
    } else !checkForAbstain && setValue('answer', [option]);
  }
  function handleAbstainChoice() {
    const checkForAbstain = getValues('answer');
    if (checkForAbstain && !checkForAbstain.includes('abstain')) {
      setValue('answer', ['abstain']);
    }
  }

  if (!options) return null;
  if (type === 'SingleChoice') {
    return (
      <fieldset>
        <h1 className="title-bold text-left pt-4 pb-4">Voting</h1>
        <p className="small mb-4">
          <span className="small-bold">Single Choice</span>, select only one
        </p>
        <div className="overflow-y-auto h-[352px] scrollbarteal">
          {options.map((option, idx) => (
            <Questionbox variant="secondary" key={option}>
              <CheckboxButton
                id={`${idx}`}
                type="checkbox"
                value={option}
                {...register('answer')}
                onClick={() => handleSingleChoice(option)}
              />
              <p key={option}>{option}</p>
            </Questionbox>
          ))}
          <Questionbox variant="secondary">
            <CheckboxButton
              id="abstain"
              type="checkbox"
              {...register('answer')}
              value="abstain"
              onClick={() => handleSingleChoice('abstain')}
            />
            <p>Abstain</p>
          </Questionbox>
        </div>
      </fieldset>
    );
  }
  return (
    <fieldset>
      <h1 className="title-bold text-left pt-4 pb-4">Voting</h1>
      <p className="small mb-4">
        <span className="small-bold">Multi choice</span>, select many as you
        want
      </p>
      <div className="overflow-y-auto  h-[352px] scrollbarteal">
        {options.map(option => (
          <Questionbox variant="secondary" key={option}>
            <CheckboxButton
              id="multipleChoice"
              type="checkbox"
              {...register('answer')}
              value={option}
              onClick={() => handleMultipleChoice(option)}
            />
            <p key={option}>{option}</p>
          </Questionbox>
        ))}
        <Questionbox variant="secondary">
          <CheckboxButton
            id="multipleChoice"
            type="checkbox"
            {...register('answer')}
            value="abstain"
            onClick={handleAbstainChoice}
          />
          <p>Abstain</p>
        </Questionbox>
      </div>
    </fieldset>
  );
}

export default VotingTypeChoice;
