'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with registers
 */
class RegisterController {
	/**
	 * Show a list of all registers.
	 * GET registers
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index ({ request, response, view }) {
	}

	/**
	 * Render a form to be used for creating a new register.
	 * GET registers/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async create ({ request, response, view }) {
		return view.render('auth.register')
	}

	/**
	 * Create/save a new register.
	 * POST registers
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store ({ request, response, session }) {
		const rules = {
			email: 'required|email|unique:users,email',
			password: 'required|min:4|confirmed'
		}

		const validation = await validate(request.all(),rules)
		if (validation.fails()) {
			session.withErrors(validation.messages()).flashExcept(['password'])
			return response.redirect('back')
		}

		const user = await User.create({
			email: request.input('email'),
			password: request.input('password')
		})

		session.flash({ successMessage: 'Conta criada com sucesso' })
		return response.redirect('/login')
	}

	/**
	 * Display a single register.
	 * GET registers/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show ({ params, request, response, view }) {
	}

	/**
	 * Render a form to update an existing register.
	 * GET registers/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async edit ({ params, request, response, view }) {
	}

	/**
	 * Update register details.
	 * PUT or PATCH registers/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update ({ params, request, response }) {
	}

	/**
	 * Delete a register with id.
	 * DELETE registers/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy ({ params, request, response }) {
	}
}

module.exports = RegisterController
