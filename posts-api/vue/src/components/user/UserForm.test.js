import {
  render,
  screen,
  fireEvent,
  getByRole,
  waitForElementToBeRemoved,
} from '@testing-library/vue'
//import UserDataTable from './UserDataTable.vue'
import UserForm from './UserForm'

test('Отображение названия формы', () => {
  render(UserForm)

  screen.getByText('Создание пользователя')
})

test('Closing form when keyDown "Esc" ', async () => {
  const body = 'Создание пользователя'
  const btn_cancel = 'Отмена'

  const { getByText, queryByTestId, getByRole, debug } = render(UserForm)

  getByText(btn_cancel)

  const btn_close = queryByTestId('btn_close', { name: 'Отмена' })
  const dialog = queryByTestId('dialog')
  const dialog_body = getByText(body)

  fireEvent.keyDown(dialog, { key: 'Esc' })

  waitForElementToBeRemoved([dialog_body, dialog]).then(() => debug())
})
