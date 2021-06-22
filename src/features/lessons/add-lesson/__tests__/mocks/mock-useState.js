import React from "react";
import {groupsMock, mentorsMock, formData} from './mock-data.js';

const useStates = {
    markError: {
        markError: false,
        setMarkError: jest.fn()
    },
    mentorError: {
        mentorError: false,
        setMentorError: jest.fn()
    },
    groupError: {
        groupError: false,
        setGroupError: jest.fn()
    },
    studentsGroup: {
        studentsGroup: false,
        setStudentsGroup: jest.fn()
    },
    mentorInput: {
        mentorInput: false,
        setMentorInput: jest.fn()
    },
    btnSave: {
        btnSave: false,
        setBtnSave: jest.fn()
    },
    classRegister: {
        classRegister: false,
        setClassRegister: jest.fn()
    },
    formData: {
        formData: false,
        setFormData: jest.fn()
    }
};

const useStateMock = {
    default: jest.fn()
        .mockReturnValueOnce([useStates.markError.markError, useStates.markError.setMarkError])
        .mockReturnValueOnce([useStates.mentorError.mentorError, useStates.mentorError.setMentorError])
        .mockReturnValueOnce([useStates.groupError.groupError, useStates.groupError.setGroupError])
        .mockReturnValueOnce([useStates.studentsGroup.studentsGroup, useStates.studentsGroup.setStudentsGroup])
        .mockReturnValueOnce([useStates.mentorInput.mentorInput, useStates.mentorInput.setMentorInput])
        .mockReturnValueOnce([useStates.btnSave.btnSave, useStates.btnSave.setBtnSave])
        .mockReturnValueOnce([useStates.classRegister.classRegister, useStates.classRegister.setClassRegister])
        .mockReturnValueOnce([useStates.formData.formData, useStates.formData.setFormData]),

    setFormData: jest.fn()
        .mockReturnValueOnce([useStates.markError.markError, useStates.markError.setMarkError])
        .mockReturnValueOnce([useStates.mentorError.mentorError, useStates.mentorError.setMentorError])
        .mockReturnValueOnce([useStates.groupError.groupError, useStates.groupError.setGroupError])
        .mockReturnValueOnce([groupsMock[0], useStates.studentsGroup.setStudentsGroup])
        .mockReturnValueOnce([mentorsMock[0].email, useStates.mentorInput.setMentorInput])
        .mockReturnValueOnce([useStates.btnSave.btnSave, useStates.btnSave.setBtnSave])
        .mockReturnValueOnce([useStates.classRegister.classRegister, useStates.classRegister.setClassRegister])
        .mockReturnValueOnce([useStates.formData.formData, useStates.formData.setFormData]),

    renderFormData: jest.fn()
        .mockReturnValueOnce([useStates.markError.markError, useStates.markError.setMarkError])
        .mockReturnValueOnce([useStates.mentorError.mentorError, useStates.mentorError.setMentorError])
        .mockReturnValueOnce([useStates.groupError.groupError, useStates.groupError.setGroupError])
        .mockReturnValueOnce([groupsMock[0], useStates.studentsGroup.setStudentsGroup])
        .mockReturnValueOnce([mentorsMock[0].email, useStates.mentorInput.setMentorInput])
        .mockReturnValueOnce([useStates.btnSave.btnSave, useStates.btnSave.setBtnSave])
        .mockReturnValueOnce([true, useStates.classRegister.setClassRegister])
        .mockReturnValueOnce([formData.default, useStates.formData.setFormData]),

    changeMark: jest.fn()
        .mockReturnValueOnce([useStates.markError.markError, useStates.markError.setMarkError])
        .mockReturnValueOnce([useStates.mentorError.mentorError, useStates.mentorError.setMentorError])
        .mockReturnValueOnce([useStates.groupError.groupError, useStates.groupError.setGroupError])
        .mockReturnValueOnce([groupsMock[0], useStates.studentsGroup.setStudentsGroup])
        .mockReturnValueOnce([mentorsMock[0].email, useStates.mentorInput.setMentorInput])
        .mockReturnValueOnce([useStates.btnSave.btnSave, useStates.btnSave.setBtnSave])
        .mockReturnValueOnce([true, useStates.classRegister.setClassRegister])
        .mockReturnValueOnce([formData.formDataMockPresent, useStates.formData.setFormData]),

    submit: jest.fn()
        .mockReturnValueOnce([useStates.markError.markError, useStates.markError.setMarkError])
        .mockReturnValueOnce([useStates.mentorError.mentorError, useStates.mentorError.setMentorError])
        .mockReturnValueOnce([useStates.groupError.groupError, useStates.groupError.setGroupError])
        .mockReturnValueOnce([groupsMock[0], useStates.studentsGroup.setStudentsGroup])
        .mockReturnValueOnce([mentorsMock[0].email, useStates.mentorInput.setMentorInput])
        .mockReturnValueOnce([true, useStates.btnSave.setBtnSave])
        .mockReturnValueOnce([true, useStates.classRegister.setClassRegister])
        .mockReturnValueOnce([formData.formDataMockSubmit, useStates.formData.setFormData]),
};

export { useStates, useStateMock };
